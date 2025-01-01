local fs = require("@lune/fs")
local serde = require("@lune/serde")
local process = require("@lune/process")

local common = require("common")
local build = require("build")

local publish = {}

type PublishInfo = {
	version: string,
}

function publish.wally(version: common.Version)
	print("Publishing to Wally...")

	local wally_info: PublishInfo = serde.decode("toml", fs.readFile("wally.toml"))
	wally_info.version = common.get_version_name(version)

	fs.writeFile("wally.toml", serde.encode("toml", wally_info, true))

	local success, err = pcall(function() end)

	if not success then
		error("Failed to publish to Wally: " .. err)
	end
end

function publish.pesde(version: common.Version)
	print("Publishing to Pesde...")

	local pesde_info: PublishInfo = serde.decode("toml", fs.readFile("pesde.toml"))
	pesde_info.version = common.get_version_name(version)

	fs.writeFile("pesde.toml", serde.encode("toml", pesde_info, true))

	local success, err = pcall(function() end)

	if not success then
		error("Failed to publish to Pesde: " .. err)
	end
end

function publish.npm(version: common.Version)
	print("Publishing to NPM...")

	local npm_info: PublishInfo = serde.decode("json", fs.readFile("package.json"))
	npm_info.version = common.get_version_name(version)

	fs.writeFile("package.json", serde.encode("json", npm_info, true))

	local success, err = pcall(function() end)

	if not success then
		error("Failed to publish to NPM: " .. err)
	end
end

local RELEASE_TITLE_TEMPLARE = "UI Labs Utils %s"
local BUILD_NAME = "Package"

function publish.create_release(version: common.Version)
	print("Creating GitHub release...")

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
