import { suite } from "uvu";
import * as assert from "assert";
import * as zx from "zx";
import * as progress from "zx/experimental/progress";

// Manual mocks
const zxMock = (zx.default = async () => {});
const progressMock = {
  total: 0,
  done: () => {},
  abort: () => {},
};

progress.progress = () => progressMock;

const InstallBuildah = suite("install-buildah.mjs");

InstallBuildah("should install Buildah successfully", async () => {
  let doneCalled = 0;
  let abortCalled = 0;

  // Mock implementations
  progressMock.done = () => {
    doneCalled++;
  };
  progressMock.abort = () => {
    abortCalled++;
  };

  // Run the install-buildah.mjs script
  const installBuildah = require("../installer/install_buildah.mjs").default;
  await installBuildah();

  // Validate zx calls (assuming zx.default is called)
  assert.strictEqual(
    zx.default.mock.calls.length,
    7,
    "zx should have been called 7 times"
  );

  // Validate progress bar updates
  assert.strictEqual(doneCalled, 1, "done should have been called once");
  assert.strictEqual(abortCalled, 0, "abort should not have been called");
});

InstallBuildah.run();
