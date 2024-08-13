package io.github.gabrielnavas.api.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityName, String key, String value) {
        super(String.format("%s not found when %s is %s", entityName, key, value));
    }
}
