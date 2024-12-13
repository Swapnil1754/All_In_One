package com.example.RegistrationService.Annotations;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

public interface DataAuditAspect {
    Object audit(ProceedingJoinPoint joinPoint) throws Throwable;
    void onException(JoinPoint joinPoint, Throwable throwable);
}
