<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\Controller;

use App\DTO\ContactFormData;
use App\Form\ContactFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * @author Rafał Brauner
 */
final class ContactFormController extends AbstractController
{
    #[Route('/contact', name: 'app_contact_form', methods: ['POST'])]
    public function submit(Request $request): JsonResponse
    {
        $contactFormData = new ContactFormData();
        $form = $this->createForm(ContactFormType::class, $contactFormData);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // TODO: Handle form submission (e.g., send email, save to database)
            // For now, we'll just return a success response

            return new JsonResponse([
                'success' => true,
                'message' => 'component.contact_form.success',
            ]);
        }

        // Collect validation errors
        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return new JsonResponse([
            'success' => false,
            'message' => 'component.contact_form.error',
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }
}
