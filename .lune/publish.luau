local fs = require("@lune/fs")
local serde = require("@lune/serde")
local process = require("@lune/process")

local common = require("common")
local build = require("build")

local publish = {}

type PublishInfo = {
	version: string,
}
type WallyInfo = {
	package: {
		version: string,
	},
}

function publish.wally(version: common.Version)
	print("")
	print("Publishing to Wally...")
	print("")

	local wally_info: WallyInfo = serde.decode("toml", fs.readFile("wally.toml"))
	wally_info.package.version = common.get_version_name(version)

	fs.writeFile("wally.toml", serde.encode("toml", wally_info, true))

	local output = process.spawn("wally", { "publish" }, { stdio = "forward" })

	if not output.ok then
		error("Failed to publish to Wally: ", output.stderr)
	end
end

function publish.pesde(version: common.Version)
	print("")
	print("Publishing to Pesde...")
	print("")

	local pesde_info: PublishInfo = serde.decode("toml", fs.readFile("pesde.toml"))
	pesde_info.version = common.get_version_name(version)

	fs.writeFile("pesde.toml", serde.encode("toml", pesde_info, true))

	if fs.isFile("pesde.lock") then
		fs.removeFile("pesde.lock")
	end

	process.spawn("pesde", { "install" }, { stdio = "forward" })

	local output = process.spawn("pesde", { "publish" }, { stdio = "forward" })

	if not output.ok then
		error("Failed to publish to Pesde: ", output.stderr)
	end
end

function publish.npm(version: common.Version)
	print("")
	print("Publishing to NPM...")
	print("")

	local npm_info: PublishInfo = serde.decode("json", fs.readFile("package.json"))
	npm_info.version = common.get_version_name(version)

	fs.writeFile("package.json", serde.encode("json", npm_info, true))

	local result = process.spawn("npm", { "publish" }, { stdio = "forward", shell = true })

	if not result.ok then
		error("Failed to publish to NPM: ", result.stderr)
	end
end

local RELEASE_TITLE_TEMPLARE = "UI Labs Utils %s"
local BUILD_NAME = "Package"

function publish.create_release(version: common.Version)
	print("")
	print("Creating GitHub release...")
	print("")

	local release_name = common.get_version_name(version)
	local tag_name = `v{release_name}`
	local release_title = string.format(RELEASE_TITLE_TEMPLARE, tag_name)

	local base_changelog = fs.readFile("changelog_generation/base.md")
	local version_changelog = fs.readFile(`changelog_generation/versions/{release_name}.md`)

	local release_notes = base_changelog .. "\n" .. version_changelog

	build(BUILD_NAME)

	process.spawn("git", { "tag", tag_name }, { stdio = "forward" })
	process.spawn("git", { "push", "origin", tag_name }, { stdio = "forward" })

	-- create a draft release, so we can review it before
	process.spawn(
		"gh",
		{ "release", "create", tag_name, `{BUILD_NAME}.rbxm`, "-t", release_title, "-n", release_notes, "-d" },
		{ stdio = "forward" }
	)
end

function publish.generate_accumulated_changelog() end

return table.freeze(publish)
