<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

require_once __DIR__.'/vendor/autoload.php';

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = new Finder()
    ->in([
        __DIR__.'/bin',
        __DIR__.'/config',
        __DIR__.'/migrations',
        __DIR__.'/public',
        __DIR__.'/src',
        __DIR__.'/tests',
    ])
    ->exclude([
        __DIR__.'/var',
        __DIR__.'/vendor',
    ])
;

return new Config()
    ->setRules([
        '@PhpCsFixer' => true,
        'declare_strict_types' => true,
        'phpdoc_to_comment' => false,
        'header_comment' => [
            'comment_type' => 'PHPDoc',
            'header' => 'Copyright (C) Rafał Brauner',
        ],
    ])
    ->setFinder($finder)
    ->setRiskyAllowed(true)
;
