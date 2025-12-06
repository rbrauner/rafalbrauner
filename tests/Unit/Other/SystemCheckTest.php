<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\Tests\Unit\Other;

use PHPUnit\Framework\Attributes\CoversNothing;
use PHPUnit\Framework\TestCase;

/**
 * @internal
 */
#[CoversNothing]
final class SystemCheckTest extends TestCase
{
    public function testSystemIsWorking(): void
    {
        $this->expectNotToPerformAssertions();
    }
}
