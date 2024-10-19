#!/bin/bash

cat <<EOL > .git/hooks/pre-commit
#!/bin/sh

npm run format
git add .
EOL

chmod +x .git/hooks/pre-commit
