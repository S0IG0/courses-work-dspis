package com.shop.shopService.resolver;

import com.shop.shopService.exception.DuplicateException;
import com.shop.shopService.exception.NotAuthenticate;
import com.shop.shopService.exception.NotFoundItemException;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.jetbrains.annotations.NotNull;
import org.springframework.graphql.execution.DataFetcherExceptionResolver;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;

@Component
class CustomExceptionResolver implements DataFetcherExceptionResolver {

    @Override
    public @NotNull Mono<List<GraphQLError>> resolveException(
            @NotNull Throwable exception,
            @NotNull DataFetchingEnvironment environment
    ) {
        if (exception instanceof NotFoundItemException) {
            GraphQLError error = GraphqlErrorBuilder.newError()
                    .errorType(ErrorType.NOT_FOUND)
                    .message(exception.getMessage())
                    .path(environment.getExecutionStepInfo().getPath())
                    .location(environment.getField().getSourceLocation())
                    .build();
            return Mono.just(Collections.singletonList(error));
        } else if (exception instanceof DuplicateException) {
            GraphQLError error = GraphqlErrorBuilder.newError()
                    .errorType(ErrorType.BAD_REQUEST)
                    .message(exception.getMessage())
                    .path(environment.getExecutionStepInfo().getPath())
                    .location(environment.getField().getSourceLocation())
                    .build();
            return Mono.just(Collections.singletonList(error));
        } else if (exception instanceof NotAuthenticate) {
            GraphQLError error = GraphqlErrorBuilder.newError()
                    .errorType(ErrorType.UNAUTHORIZED)
                    .message(exception.getMessage())
                    .path(environment.getExecutionStepInfo().getPath())
                    .location(environment.getField().getSourceLocation())
                    .build();
            return Mono.just(Collections.singletonList(error));
        }

        return Mono.just(Collections.emptyList());
    }
}