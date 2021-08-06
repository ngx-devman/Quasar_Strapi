NEW_VER=$(npm version --prefix front --no-git-tag-version $1)
npm version --prefix platform --no-git-tag-version $1
git add ./platform/package.json ./front/package.json
git commit -m "Bump version to ${NEW_VER}"