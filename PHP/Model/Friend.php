<?php
namespace Model;
use JsonSerializable;
class Friend implements JsonSerializable {
    private $username;
    private $status;

    public function __construct($username = null, $status = null) {
        $this->username = $username;
        $this->status = $status;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatusAccepted() {
        $this->status = 'accepted';
    }

    public function setStatusDismissed() {
        $this->status = 'dismissed';
    }

    public function jsonSerialize(): mixed {
        return get_object_vars($this);
    }

    public static function fromJson($data): self {
        $friend = new self();
        foreach ($data as $key => $value) {
            $friend->{$key} = $value;
        }
        return $friend;
    }

}
?>