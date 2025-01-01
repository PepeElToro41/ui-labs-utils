local proccess = require("@lune/process")
local serde = require("@lune/serde")
local fs = require("@lune/fs")
local stdio = require("@lune/stdio")
local publish = require("publish")

local common = require("common")

if not fs.isFile("changelog_generation/version.json") then
	error("Version file not found")
end
if not fs.isFile("changelog_generation/base.md") then
	error("Base changelog file not found")
end

local release_type: common.ReleaseType = proccess.args[1]
local version_file = fs.readFile("changelog_generation/version.json")

local new_version: common.Version = serde.decode("json", version_file)

if release_type:match("^%d+%.%d+%.%d+$") then
	-- specific release
	local release_info = release_type:split(".")
	local major = release_info[1] and tonumber(release_info[1])
	local minor = release_info[2] and tonumber(release_info[2])
	local patch = release_info[3] and tonumber(release_info[3])

	if release_info[4] then
		error("Invalid release type")
	end
	if not major or not minor or not patch then
		error("Invalid release type")
	end

	new_version.major = major
	new_version.minor = minor
	new_version.patch = patch
else
	-- incremental release
	if release_type ~= "major" and release_type ~= "minor" and release_type ~= "patch" then
		error("Invalid release type")
	end

	new_version[release_type] += 1
end

local version_name = `{new_version.major}.{new_version.minor}.{new_version.patch}`

local shouldPublish = stdio.prompt("confirm", `Releasing version {version_name}. Proceed?`)

if not shouldPublish then
	error("Release aborted")
	return
end

print("")
print("Publishing version as: " .. version_name)

if not fs.isFile(`changelog_generation/versions/{version_name}.md`) then
	error("Changelog file not found for version: " .. version_name)
end

fs.writeFile("src/Version.luau", `return "{version_name}"`)

--publish.wally(new_version)
--publish.pesde(new_version)
--publish.npm(new_version)
publish.create_release(new_version)

--fs.writeFile("changelog_generation/version.json", serde.encode("json", new_version, true))
