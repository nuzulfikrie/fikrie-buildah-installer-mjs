import { progress } from "zx/experimental/progress";

// Update the package lists.
const updatePackageLists = async () => {
  await zx("sudo apt update");
};

// Install the Software Properties package (if not installed).
const installSoftwareProperties = async () => {
  await zx("sudo apt install -y software-properties-common");
};

// Add the Kubic project repositories.
const addKubicProjectRepositories = async () => {
  await zx(
    `sudo sh -c "echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Raspbian_10/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list"`
  );
  await zx(
    "wget -nv https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable/Raspbian_10/Release.key -O- | sudo apt-key add -"
  );
};

// Update the package lists again.
const updatePackageListsAgain = async () => {
  await zx("sudo apt update");
};

// Install Buildah.
const installBuildah = async () => {
  await zx("sudo apt install -y buildah");
};

// Verify the installation.
const verifyInstallation = async () => {
  await zx("buildah --version");
};

const main = async () => {
  // Update the package lists.
  console.log("Updating package lists...");
  await updatePackageLists();
  console.log("Package lists updated.");

  // Install the Software Properties package (if not installed).
  console.log("Installing Software Properties package...");
  await installSoftwareProperties();
  console.log("Software Properties package installed.");

  // Add the Kubic project repositories.
  console.log("Adding Kubic project repositories...");
  await addKubicProjectRepositories();
  console.log("Kubic project repositories added.");

  // Update the package lists again.
  console.log("Updating package lists again...");
  await updatePackageListsAgain();
  console.log("Package lists updated again.");

  // Install Buildah.
  console.log("Installing Buildah...");
  await installBuildah();
  console.log("Buildah installed.");

  // Verify the installation.
  console.log("Verifying installation...");
  await verifyInstallation();
  console.log("Installation verified.");
};

// Add a progress bar.
const progressBar = progress({
  total: 6,
});

main()
  .then(() => {
    progressBar.done();
    console.log("Installation complete!");
  })
  .catch((error) => {
    progressBar.abort();
    console.error("Installation failed:", error);
  });
