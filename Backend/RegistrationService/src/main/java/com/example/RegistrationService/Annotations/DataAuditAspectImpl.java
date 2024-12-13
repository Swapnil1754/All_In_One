package com.example.RegistrationService.Annotations;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Aspect
@Component
public class DataAuditAspectImpl implements DataAuditAspect {
    private static final Logger logger = LoggerFactory.getLogger(DataAuditAspectImpl.class);
    @Around("@annotation(com.example.RegistrationService.Annotations.RequestAudit)")
    @Override
    public Object audit(ProceedingJoinPoint joinPoint) throws Throwable {
        // Before logic
        String request = getRequestJson(joinPoint);
        logger.info("DataAudit Before hitting the method: {}", request);
        postToElastic("Before", joinPoint);
        Object result;
        try {
            result = joinPoint.proceed();
        } catch (Throwable ex) {
            logger.error("DataAudit Exception in method: {}", ex.getMessage());
            postToElastic("Exception", joinPoint, ex);
            throw ex;
        }


        // After logic
        logger.info("DataAudit After hitting the method: {}", joinPoint.getSignature());
        postToElastic("After", joinPoint, result);

        return result;
    }
    private void postToElastic(String event, ProceedingJoinPoint joinPoint) {
        // Replace this with Elasticsearch posting logic
        logger.info("DataAudit Posting '{}' event to Elasticsearch for method: {}", event, joinPoint.getSignature());
    }

    private void postToElastic(String event, ProceedingJoinPoint joinPoint, Object details) {
        // Replace this with Elasticsearch posting logic, including exception or result details
        logger.info("DataAudit Posting '{}' event to Elasticsearch for method: {}, Details: {}", event, joinPoint.getSignature(), details);
    }
    private String getRequestJson(JoinPoint joinPoint) {
        ObjectNode parentNode = null;
        try {
            MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
            methodSignature.getParameterNames();
            Object[] argValues = joinPoint.getArgs();
            String[] argNames = methodSignature.getParameterNames();
            parentNode = MapperUtils.getParentNode();
            if (!ArrayUtils.isEmpty(argNames)) {
                for (int size = 0; size < argNames.length; size++) {
                    if (!argNames[size].equalsIgnoreCase("maskMap")) {
                        MapperUtils.toJsonNode(parentNode, argValues[size], argNames[size]);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("GenericAuditAspectImpl - getRequestJson - Exception occurred : {}", ExceptionUtils.getStackTrace(e));
        }
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (Objects.nonNull(attributes)) {
            HttpServletRequest request = ((ServletRequestAttributes) attributes).getRequest();
            String forwardedFor = request.getHeader("X-Forwarded-For");
            String forwarderFor = request.getHeader("X-Forwarder-For");
            if (StringUtils.isBlank(forwardedFor)) {
                forwardedFor = request.getRemoteAddr();
            }
            if (StringUtils.isBlank(forwarderFor)) {
                forwarderFor = request.getRemoteAddr();
            }
            parentNode.put("X_Forwarded_For", forwardedFor);
            parentNode.put("X_Forwarder_For", forwarderFor);
        }
        return parentNode.toString();
    }

    @Override
    public void onException(JoinPoint joinPoint, Throwable throwable) {

    }
}
