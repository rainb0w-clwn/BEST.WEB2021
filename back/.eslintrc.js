module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "rules": {
        'arrow-parens': ['error', 'as-needed', {requireForBlockBody: true}],
        'brace-style': 'error',
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        curly: 'error',
        indent: 'off',
        'lines-between-class-members': ['error', 'always'],
        'no-useless-constructor': 'off',
        quotes: 'off',
        'space-before-blocks': 'error',
        'sort-imports': [
            2,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
        'object-curly-spacing': ['error', 'never'],
        semi: ['error', 'always'],
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'eol-last': ['error', 'always'],

    },
    "globals": {
        "process": true,
    },
    "ignorePatterns": [
        "src/migrations/*",
    ],
};
