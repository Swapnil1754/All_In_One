package com.example.common_data.Annotations;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

public interface GenericAuditAspect {
    Object audit(ProceedingJoinPoint joinPoint) throws Throwable;
    void onException(JoinPoint joinPoint, Throwable throwable);
}
