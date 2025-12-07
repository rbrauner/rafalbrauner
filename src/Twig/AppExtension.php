<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\Twig;

use Twig\Attribute\AsTwigFunction;

final class AppExtension
{
    #[AsTwigFunction('vue_component', isSafe: ['html'])]
    public function vueComponent(string $componentName, array $props = []): string
    {
        $params = ['component' => $componentName];
        if ([] !== $props) {
            $params['props'] = $props;
        }

        return sprintf(
            "<vue-component name='%s' props='%s'></vue-component>",
            $params['component'],
            isset($params['props']) ? htmlentities(json_encode($params['props'])) : ''
        );
    }
}
