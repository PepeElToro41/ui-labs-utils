local process = require("@lune/process")

local old_tag = process.args[1]
local new_tag = process.args[2]

-- create new tag from old tag
process.spawn("git", { "tag", new_tag, old_tag }, { stdio = "forward" })

-- push new tag
process.spawn("git", { "push", "origin", new_tag }, { stdio = "forward" })

-- edit release to use new tag
process.spawn("gh", { "release", "edit", old_tag, "--tag", new_tag }, { stdio = "forward" })

-- delete old tag
process.spawn("git", { "tag", "-d", old_tag }, { stdio = "forward" })

-- push tag deletion
process.spawn("git", { "push", "origin", "--delete", old_tag }, { stdio = "forward" })
