<?php

namespace Model;

use JsonSerializable;

class User implements JsonSerializable
{
    private $username;
    private $firstName;
    private $lastName;
    private $description;
    private $favDrink;
    private $chatLayout;
    public function __construct($username = null)
    {
        $this->username = $username;
    }

    public function getUsername()
    {
        return $this->username;
    }
    public function getFirstName()
    {
        return $this->firstName;
    }
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }
    public function getLastName()
    {
        return $this->lastName;
    }
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }
    public function getDescription()
    {
        return $this->description;
    }
    public function setDescription($description)
    {
        $this->description = $description;
    }
    public function getFavDrink()
    {
        return $this->favDrink;
    }
    public function setFavDrink($favDrink)
    {
        $this->favDrink = $favDrink;
    }
    public function getChatLayout()
    {
        return $this->chatLayout;
    }
    public function setChatLayout($chatLayout)
    {
        $this->chatLayout = $chatLayout;
    }
    public function jsonSerialize(): mixed
    {
        return get_object_vars($this);
    }

    public static function fromJson($data): self
    {
        $user = new self();
        foreach ($data as $key => $value) {
            $user->{$key} = $value;
        }
        return $user;
    }
}
