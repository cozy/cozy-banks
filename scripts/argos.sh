#!/bin/bash
#
# Will upload screenshots from QA tests to Argos
# If ARGOS_BRANCH and ARGOS_COMMIT are not available, current branch and current
# commit will be retrieve from git
#
# ARGOS_TOKEN must be available.

set -euo pipefail

CURRENT_GIT_COMMIT=$(git rev-parse --verify HEAD)
CURRENT_GIT_BRANCH=$(git branch | grep -e '^\*' | sed 's/\* //')
ARGOS_BRANCH=${ARGOS_BRANCH:-$CURRENT_GIT_BRANCH}
ARGOS_COMMIT=${ARGOS_COMMIT:-$CURRENT_GIT_COMMIT}

yarn argos --branch $ARGOS_BRANCH --commit $ARGOS_COMMIT --token $ARGOS_TOKEN
