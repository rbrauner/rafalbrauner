<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author Rafał Brauner
 */
final class ContactFormData
{
    #[Assert\NotBlank(message: 'component.contact_form.name.validation.not_blank')]
    #[Assert\Length(
        min: 2,
        max: 100,
        minMessage: 'component.contact_form.name.validation.min_length',
        maxMessage: 'component.contact_form.name.validation.max_length'
    )]
    public ?string $name = null;

    #[Assert\NotBlank(message: 'component.contact_form.email.validation.not_blank')]
    #[Assert\Email(message: 'component.contact_form.email.validation.invalid')]
    public ?string $email = null;

    #[Assert\NotBlank(message: 'component.contact_form.message.validation.not_blank')]
    #[Assert\Length(
        min: 10,
        max: 5000,
        minMessage: 'component.contact_form.message.validation.min_length',
        maxMessage: 'component.contact_form.message.validation.max_length'
    )]
    public ?string $message = null;
}
