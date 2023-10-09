{
  description = "Development Environment for Block Ballot wrapped up in a Nix Flake";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          yarn
          nodejs
          (with nodePackages; [
            typescript
            typescript-language-server
            prettier
          ])
        ];
      };
    });
}
