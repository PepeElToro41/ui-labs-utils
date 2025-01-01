export type ReleaseType = "major" | "minor" | "patch"

export type Version = {
	major: number,
	minor: number,
	patch: number,
}

local common = {}

function common.get_version_name(version: Version)
	return `{version.major}.{version.minor}.{version.patch}`
end

return common
