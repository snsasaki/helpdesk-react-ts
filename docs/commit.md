# Commit Prefix

## Rule

| type                               | emoji |
| ---------------------------------- | :---: |
| 初めてのコミット（Initial Commit） |  🎉   |
| バージョンタグ（Version Tag）      |  🔖   |
| 新機能（New Feature）              |  ✨   |
| 機能改善 (Functional Improvement)  |  🔧   |
| バグ修正（Bugfix）                 |  🐛   |
| リファクタリング(Refactoring)      |  ♻️   |
| ドキュメント（Documentation）      |  📚   |
| デザインUI/UX(Accessibility)       |  🎨   |
| パフォーマンス（Performance）      |  🐎   |
| 注意                               |  🚨   |
| 非推奨追加（Deprecation）          |  💩   |
| 削除（Removal）                    |  🗑️   |
| WIP(Work In Progress)              |  🚧   |

## setting commit template

```shell
$ git config commit.template ./.github/gitmessage.txt &&\
    git config --add commit.cleanup strip
```
