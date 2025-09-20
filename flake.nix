{
  description = "A very basic flake (optional)";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils
  }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          bun
        ];
        shellHook = ''
          PS1="\\n\\[\\033[33m\\][fyp:\\w]\$ \\[\\033[0m\\]"
          echo ""
          echo 'press Ctrl+D to exit'
        '';
      };
    }
  );
}
