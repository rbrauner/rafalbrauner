<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\Form;

use App\DTO\ContactFormData;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Rafał Brauner
 *
 * @extends AbstractType<ContactFormData>
 */
final class ContactFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $inputClasses = 'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 '
            .'bg-white dark:bg-gray-700 text-gray-900 dark:text-white '
            .'placeholder-gray-400 dark:placeholder-gray-500 '
            .'focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';

        $builder
            ->add('name', TextType::class, [
                'label' => 'component.contact_form.name.label',
                'attr' => [
                    'placeholder' => 'component.contact_form.name.placeholder',
                    'class' => $inputClasses,
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'component.contact_form.email.label',
                'attr' => [
                    'placeholder' => 'component.contact_form.email.placeholder',
                    'class' => $inputClasses,
                ],
            ])
            ->add('message', TextareaType::class, [
                'label' => 'component.contact_form.message.label',
                'attr' => [
                    'placeholder' => 'component.contact_form.message.placeholder',
                    'rows' => 6,
                    'class' => $inputClasses.' resize-none',
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ContactFormData::class,
        ]);
    }
}
