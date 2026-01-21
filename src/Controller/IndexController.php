<?php

declare(strict_types=1);

/**
 * Copyright (C) Rafał Brauner
 */

namespace App\Controller;

use App\DTO\ContactFormData;
use App\Form\ContactFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * @author Rafał Brauner
 */
final class IndexController extends AbstractController
{
    #[Route('/{_locale}', name: 'app_pages_index', requirements: ['_locale' => 'pl|en'], defaults: ['_locale' => 'pl'])]
    public function index(): Response
    {
        $contactForm = $this->createForm(ContactFormType::class, new ContactFormData(), [
            'action' => $this->generateUrl('app_contact_form'),
            'method' => 'POST',
        ]);

        return $this->render('index/index.html.twig', [
            'contactForm' => $contactForm,
        ]);
    }
}
