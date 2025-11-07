{ pkgs, ... }: {
  # Nix channel to use.
  channel = "stable-24.05";

  # Packages to make available in the environment.
  packages = [
    pkgs.nodejs_20  # Using Node.js version 20
  ];

  # Environment variables to set.
  env = {};

  # VS Code extensions to install.
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
    ];

    # Workspace lifecycle hooks.
    workspace = {
      # Runs when a workspace is first created.
      onCreate = {
        install-deps = "npm install";
      };
      # Runs every time the workspace is (re)started.
      onStart = {
        start-dev-server = "npm run dev";
      };
    };

    # Web preview configuration.
    previews = {
      enable = true;
      previews = {
        web = {
          # Command to start the web server.
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
