<?php
/**
 * Copyright © 2014, Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file SplashbasePictureFinder.php
 * @author Ambroise Maupate
 */
namespace RZ\Roadiz\Utils\MediaFinders;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

/**
 * Util to grab a facebook profile picture from userAlias.
 */
class SplashbasePictureFinder extends AbstractEmbedFinder
{
    private $client;
    protected static $platform = 'splashbase';

    /**
     * SplashbasePictureFinder constructor.
     * @param string $embedId
     */
    public function __construct($embedId = '')
    {
        parent::__construct($embedId);

        $this->client = new Client();
    }

    protected function validateEmbedId($embedId = "")
    {
        return $embedId;
    }

    /**
     * @see http://www.splashbase.co/api#images_random
     */
    public function getRandom()
    {
        try {
            $response = $this->client->get('http://www.splashbase.co/api/v1/images/random?images_only=true');
            $this->feed = $response->json();

            if (false !== strpos($this->feed['url'], '.jpg')) {
                $this->embedId = $this->feed['id'];

                return $this->feed;
            } else {
                $this->feed = false;
                return false;
            }
        } catch (ClientException $e) {
            $this->feed = false;
            return false;
        }
    }


    /**
     * {@inheritdoc}
     */
    public function getMediaFeed($search = null)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function getSearchFeed($searchTerm, $author, $maxResults = 15)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function getMediaTitle()
    {
        return "";
    }

    /**
     * {@inheritdoc}
     */
    public function getMediaDescription()
    {
        return "";
    }

    /**
     * {@inheritdoc}
     */
    public function getMediaCopyright()
    {
        return $this->feed['copyright'].' — '.$this->feed['site'];
    }

    /**
     * {@inheritdoc}
     */
    public function getThumbnailURL()
    {
        if (null === $this->feed) {
            $this->getRandom();

            if (false === $this->feed) {
                return false;
            }
        }
        /*
         * http://www.splashbase.co/api#images_random
         */
        return !empty($this->feed['large_url']) ? $this->feed['large_url'] : $this->feed['url'];
    }
}
