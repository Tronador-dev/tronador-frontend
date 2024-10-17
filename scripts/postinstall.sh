#!/bin/bash

cat <<EOL > .git/hooks/pre-commit
#!/bin/sh

npm run format
npm run lint

if [ \$? -ne 0 ]; then
  echo "Pre-commit hook failed. Fix issues before committing."
  exit 1
fi
EOL

chmod +x .git/hooks/pre-commit
