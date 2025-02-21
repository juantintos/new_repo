```mermaid
sequenceDiagram
    participant Usuario
    participant Navegador
    participant Servidor
    participant API

    Usuario->>Navegador: 1. Accede a la URL de la SPA: /exampleapp/spa
    Navegador->>Servidor: 2. Solicitud GET a /exampleapp/spa
    Servidor-->>Navegador: 3. Devuelve el HTML inicial de la SPA
    Navegador->>API: 4. Solicitud GET a /exampleapp/data.json (vía JavaScript)
    API-->>Navegador: 5. Devuelve los datos en JSON (notas)
    Navegador->>Usuario: 6. Renderiza las notas en la interfaz de usuario
```
