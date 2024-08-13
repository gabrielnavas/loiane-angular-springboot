package io.github.gabrielnavas.api.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityName) {
        super(String.format("%s not found", entityName));
    }
}
