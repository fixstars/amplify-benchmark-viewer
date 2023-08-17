SRC_DIR=src
EXCEPT_LIST=(
  '.snap'
  '.json'
  'src/index.css'
  'src/react-app-env.d.ts'
  'src/reportWebVitals.ts'
  'src/setupTests.ts'
  'src/@types/report_data.d.ts'
)

LICENSE=$(cat docs/license_block.txt)

FIND_COMMAND="find '$SRC_DIR' -type f"
for VALUE in ${EXCEPT_LIST[@]}; do
  FIND_COMMAND="$FIND_COMMAND | grep -v \\$VALUE$"
done

eval $FIND_COMMAND | while read FILE; do
  if grep -qz "Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation." $FILE; then
      continue
  fi
  CONTENTS=$(cat "$FILE")
  echo "$LICENSE\n$CONTENTS" > "$FILE"
done;
