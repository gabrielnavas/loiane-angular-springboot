package io.github.gabrielnavas.api.exception;

import java.util.Arrays;
import java.util.List;

public class EntityNotFoundButShouldBeException extends RuntimeException {

    public EntityNotFoundButShouldBeException(String entityName, String key, String value, List<String> shouldBe) {
        super(String.format(
                "%s not found when %s is %s, but should be %s",
                entityName, key, value, Arrays.toString(shouldBe.toArray()))
        );
    }
}
