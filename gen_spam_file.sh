#!/bin/sh
source ./env_sample.sh
set -e

FLUTTER_LOCALIZATION_PATH="${LOCALIZATION_PACKAGE_PATH}/lib/l10n/"
node index.js $EXCEL_LOCALIZATION_FILE_PATH $FLUTTER_LOCALIZATION_PATH
cd $LOCALIZATION_PACKAGE_PATH
flutter packages pub global activate intl_utils && flutter pub global run intl_utils:generate