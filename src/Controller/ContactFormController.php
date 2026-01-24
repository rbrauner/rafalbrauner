<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\Controller;

use App\DTO\ContactFormData;
use App\Form\ContactFormType;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @author Rafał Brauner
 */
final class ContactFormController extends AbstractController
{
    public function __construct(
        private readonly MailerInterface $mailer,
        private readonly TranslatorInterface $translator,
        private readonly string $contactEmail,
        private readonly string $mailerEmail,
    ) {}

    #[Route('/contact', name: 'app_contact_form', methods: ['POST'])]
    public function submit(Request $request): JsonResponse
    {
        $contactFormData = new ContactFormData();
        $form = $this->createForm(ContactFormType::class, $contactFormData);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            try {
                // Email to website owner with contact form data
                $emailToOwner = (new TemplatedEmail())
                    ->from($this->mailerEmail)
                    ->to($this->contactEmail)
                    ->subject($this->translator->trans('email.contact_form.subject'))
                    ->htmlTemplate('emails/contact_form.html.twig')
                    ->context([
                        'data' => $contactFormData,
                    ])
                ;
                $this->mailer->send($emailToOwner);

                // Confirmation email to sender
                $emailToSender = (new TemplatedEmail())
                    ->from($this->mailerEmail)
                    ->to($contactFormData->email)
                    ->subject($this->translator->trans('email.contact_form_confirmation.subject'))
                    ->htmlTemplate('emails/contact_form_confirmation.html.twig')
                    ->context([
                        'data' => $contactFormData,
                    ])
                ;
                $this->mailer->send($emailToSender);

                return new JsonResponse([
                    'success' => true,
                    'message' => $this->translator->trans('component.contact_form.success'),
                ]);
            } catch (\Exception $e) {
                return new JsonResponse([
                    'success' => false,
                    'message' => $this->translator->trans('component.contact_form.error'),
                    'errors' => [$e->getMessage()],
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        // Collect validation errors
        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return new JsonResponse([
            'success' => false,
            'message' => $this->translator->trans('component.contact_form.error'),
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }
}
