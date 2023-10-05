// ./tests/installer.test.mjs
import { suite } from "uvu";
import * as assert from "uvu/assert";
import * as installation from "../installer/install_buildah.mjs";

const Installation = suite("Installation");

// Mock the $ function from install_buildah.mjs
const mockShellCommand = async (cmd) => {
  if (cmd.includes("apt update")) return "apt update executed";
  if (cmd.includes("software-properties-common"))
    return "software-properties-common installed";
  if (cmd.includes("devel:kubic:libcontainers:stable.list"))
    return "repository added";
  if (cmd.includes("Release.key")) return "key added";
  if (cmd.includes("buildah")) return "buildah version 1.0";
  throw new Error(`Command not mocked: ${cmd}`);
};

// Set our mock function
installation.setMockShell(mockShellCommand);

// Now, write your tests as you had before:

Installation("updatePackageLists", async () => {
  const result = await installation.updatePackageLists();
  assert.is(result, "apt update executed");
});

Installation("installSoftwareProperties", async () => {
  const result = await installation.installSoftwareProperties();
  assert.is(result, "software-properties-common installed");
});

Installation("addKubicProjectRepositories", async () => {
  const result1 = await installation.addKubicProjectRepositories();
  const result2 = await installation.addKubicProjectRepositories();
  assert.is(result1, "repository added");
  assert.is(result2, "key added");
});

// ... add tests for other functions as needed.

// Run the tests
Installation.run();
