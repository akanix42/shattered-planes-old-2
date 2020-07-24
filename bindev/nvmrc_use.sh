#!/bin/bash

nvmrc_use_log() {
  echo "$@" >&2
}

# Traverse up in directory tree to find containing folder
nvmrc_use_find_up() {
  local path="${PWD}"
  while [ "${path}" != "" ] && [ ! -f "${path}/${1-}" ]; do
    path=${path%/*}
  done
  echo "${path}"
}

nvmrc_use_find_nvmrc() {
  local dir
  dir="$(nvmrc_use_find_up '.nvmrc')"
  if [[ -e "${dir}/.nvmrc" ]]; then
    echo "${dir}/.nvmrc"
  fi
}

# Obtain nvm version from rc file
nvmrc_use_rc_version() {
  local nvmrc_path
  nvmrc_path="$(nvmrc_use_find_nvmrc)"
  if [ ! -e "${nvmrc_path}" ]; then
    nvmrc_use_log "No .nvmrc file found"
    return 1
  fi

  local version
  version="$(cat "${nvmrc_path}")"

  if [ -z "${version-}" ]; then
    nvmrc_use_log 'No version found in '"${nvmrc_path}"
    return 1
  fi

  if [[ "${version:0:1}" != 'v' ]]; then
    version="v${version}"
  fi
  echo "${version}"
}

nvmrc_use() {
  local version
  if ! version="$(nvmrc_use_rc_version)"; then
    return 1
  fi

  # check if we're already using the specified node version
  if command -v node && [[ "$(node --version)" == "${version}" ]]; then
    nvmrc_use_log "Already using node ${version} (npm ${npm_version})"
    return
  fi
  local nvm_dir="${HOME}/.nvm"
  local node_dir="${nvm_dir}/versions/node"

  # Change current version
  export PATH="${node_dir}:${PATH}"
  hash -r
  local npm_version
  npm_version="v$(npm --version 2>/dev/null)"
  nvmrc_use_log "Now using node ${version} (npm ${npm_version})"
}
