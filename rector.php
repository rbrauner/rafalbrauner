<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

require_once __DIR__.'/vendor/autoload.php';

use Rector\Config\RectorConfig;
use Rector\DeadCode\Rector\Node\RemoveNonExistingVarAnnotationRector;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Set\ValueObject\SetList;
use Rector\Symfony\Set\SymfonySetList;

return RectorConfig::configure()
    ->withPaths([
        __DIR__.'/bin',
        __DIR__.'/config',
        __DIR__.'/migrations',
        __DIR__.'/public',
        __DIR__.'/src',
        __DIR__.'/tests',
    ])
    ->withSkip([
        __DIR__.'/var',
        __DIR__.'/vendor',
    ])
    ->withSets([
        LevelSetList::UP_TO_PHP_84,
        SetList::PHP_84,
        SetList::PHP_POLYFILLS,
        SetList::CODE_QUALITY,
        SetList::CODING_STYLE,
        SetList::DEAD_CODE,
        SetList::STRICT_BOOLEANS,
        SetList::GMAGICK_TO_IMAGICK,
        // SetList::NAMING,
        SetList::RECTOR_PRESET,
        SetList::PRIVATIZATION,
        SetList::TYPE_DECLARATION,
        SetList::EARLY_RETURN,
        SetList::INSTANCEOF,
        SetList::CARBON,
        SetList::BEHAT_ANNOTATIONS_TO_ATTRIBUTES,
        SymfonySetList::SYMFONY_74,
    ])
    ->withSkip([
        RemoveNonExistingVarAnnotationRector::class,
    ])
    ->withImportNames(importShortClasses: false, removeUnusedImports: true)
;
