<?php
/**
 * Template Name: My Custom Page
 * Description: A Page Template with a darker design.
 */


$context = Timber::context();
$context['posts'] = Timber::get_posts();
$context['foo'] = 'bar';
$templates = array('./Home-Page.twig');

Timber::render($templates, $context);

// $data = [
//     'title' => 'A Timber Tutorial - Azi',
// ];

// Timber::render('./Home-Page.twig', $data);

// get_template_part('views/base/ctrl/header');

// $context = Timber::get_context();

// $context['page'] = Timber::get_post();

// Timber::render( 'views/home/index.twig', $context );

// get_template_part('views/base/ctrl/footer');