# Carpeta de Interceptors

Esta carpeta está vacía. Aquí debes crear los HTTP interceptors de tu aplicación.

## Interceptor Obligatorio:

### **Error Handling Interceptor**
```typescript
// error-handling.interceptor.ts
@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Categorizar errores por status code
    // TODO: Logging y telemetría
    // TODO: User-friendly error messages
    
    return next.handle(req).pipe(
      // TODO: Implementar operators de RxJS para manejo de errores
    );
  }
}

```

## Funcionalidades Requeridas:

### **Error Categorization**
```typescript
interface ErrorCategory {
  type: 'network' | 'server' | 'client' | 'timeout';
  severity: 'low' | 'medium' | 'high' | 'critical';
  retryable: boolean;
  userMessage: string;
  technicalMessage: string;
}
```

### **Logging**
- Log todos los errores HTTP
- Incluir request URL, method, headers
- Timestamp y unique error ID
- Context información (user, session, etc.)

### **User Experience**
- Mostrar mensajes de error user-friendly

## Ejemplos de Implementación:

### **Error Mapping**
```typescript
private mapErrorToUserMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0: return 'Sin conexión a internet';
    case 401: return 'Sesión expirada, por favor inicia sesión';
    case 403: return 'No tienes permisos para esta acción';
    case 404: return 'Recurso no encontrado';
    case 500: return 'Error interno del servidor';
    default: return 'Error inesperado, intenta de nuevo';
  }
}
```