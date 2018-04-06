# CRM API
A simple CRM api.
_Uses swagger-flavoured markup/down_

# Goals
- All changes are recorded (blame)
-

# We need data regarding
- sales lead generation (how many more customers could we push)
- time spent on CRM checkins
- project management tools to organize a more formal onboarding process
- integration with github or jira for bug tracking and solving
- integration with other tools we use? skype, gotomeeting, joinme?
- pricing per user
- milestones based projects
- direct integration with GitHub and Jira
- has email
- has pipeline/project funneling
- has a workflow for us
- can assign clients to a CA
- can link clients into organizations
- better internal notes tool
- automated emails sent out when clients meet certain milestones (i.e. trial end), with variables in those emails
- has data

# Inspiration and Reading Material
- http://www.dummies.com/business/customers/constructing-funnels-crm/
- https://aws.amazon.com/rds/free/

# Endpoints
### Clients
```
/client:
    post:
        summary: "Add a new client"
        description: ""
        schema: "#/definitions/Client"
        responses:
            200:
                description: "successful operation"
                schema: "#/definitions/Client.id"
            405:
                description: "Invalid input"
        security:
            - "write:clients"
            - "read:clients"
/client/{id}:
    get:
        summary: "Find a client by id"
        description: "Returns a single client"
        responses:
            200:
                description: "successful operation"
                schema: "#/definitions/Client"
            400:
                description: "Invalid ID supplied"
            404:
                description: "Client not found"
        security:
            - "read:clients"
    put:
        summary: "Update a client"
        description: ""
        schema: "#/definitions/Client"
        responses:
            400:
                description: "Invalid ID supplied"
            404:
                description: "Client not found"
            405:
                description: "Validation exception"
        security:
            - "write:clients"
            - "read:clients"
    delete:
        summary: "Marks a client as deleted"
        description: ""
        responses:
            400:
                description: "Invalid ID supplied"
            404:
                description: "Client not found"
        security:
            - "write:clients"
            - "read:clients"
```

### Organizations
```
/orgs:
    post:
        summary: "Add a new organization"
        description: ""
        schema: "#/definitions/Organization"
        responses:
            200:
                description: "successful operation"
                schema: "#/definitions/Organization.id"
            405:
                description: "Invalid input"
        security:
            - "write:organizations"
            - "read:organizations"
/orgs/{id}:
    get:
        summary: "Find a organization by id"
        description: "Returns a single organization"
        responses:
            200:
                description: "successful operation"
                schema: "#/definitions/Organization"
            400:
                description: "Invalid ID supplied"
            404:
                description: "Organization not found"
        security:
            - "read:organizations"
    put:
        summary: "Update an organization"
        description: ""
        schema: "#/definitions/Organization"
        responses:
            400:
                description: "Invalid ID supplied"
            404:
                description: "Organization not found"
            405:
                description: "Validation exception"
        security:
            - "write:organizations"
            - "read:organizations"
    delete:
        summary: "Marks an organization as deleted"
        description: ""
        responses:
            400:
                description: "Invalid ID supplied"
            404:
                description: "Organization not found"
        security:
            - "write:organizations"
            - "read:organizations"
```

# Definitions
```
Client:
    description: "A single user entry"
    properties:
        id:
            type: "integer"
            format: "int64"
        updated:
            type: "string"
            format: "date-time"
            description: "Time stamp for last update to entry or creation"
        status: "#/definitions/Pipeline.stages[n]"
        email:
            type: "string"
            description: "The primary contact email"
        phone:
            type: "string"
            description: "The primary contact phone"
        advocate:
            type: "array"
            format: "int64"
            description: "The employee(s) assigned to this client"
        notes:
            type: "array"
            format: "#/definitions/Note.id"
        tags:
            type: "array"
            format: "#/definitions/Tag"
        organizations:
            type: "array"
            format: "#/definitions/Organization.id"
Pipeline:
    description: "Stages for CRM flow"
    properties:
        id:
            type: "integer"
            format: "int64"
        updated:
            type: "string"
            format: "date-time"
            description: "Time stamp for last update to entry or creation"
        stages:
            type: "array"
            format: "#/definitions/Stage"
Stage:
    description: "A stage in a Pipeline"
    properties:
        id:
            type: "integer"
            format: "int64"
        description:
            type: "string"
        updated:
            type: "string"
            format: "date-time"
            description: "Time stamp for last update to entry or creation"
        rules:
            type: "array"
            format:
                id:
                    type: "integer"
                    format: "int64"
                action:
                    type: "string"
                    format: "automate-action"
                    description: "Automated task run when an entity leaves/enters stage"
Note:
    description: "A note made against an entity"
    properties:
        id:
            type: "integer"
            format: "int64"
        updated:
            type: "string"
            format: "date-time"
            description: "Time stamp for last update to entry or creation"
        content:
            type: "string"
Tag:
    description: "User generated tag to assist in search, filtering, and grouping"
    properties:
        id:
            type: "integer"
            format: "int64"
        updated:
            type: "string"
            format: "date-time"
            description: "Time stamp for last update or creation"
        label:
            type: "string"
Organization:
    description: "A simple grouping of clients"
    properties:
        id:
            type: "integer"
            format: "int64"
        updated:
            type: "string"
            format: "date-time"
            description: "Time stamp for last update to entry or creation"
        name:
            type: "string"
        advocate:
            type: "array"
            format: "int64"
            description: "The employee(s) assigned to this client"
        tags:
            type: "array"
            format: "#/definitions/Tag"
        clients:
            type: "array"
            format: "int64"
            description: "The clients assigned to this group"
        email:
            type: "string"
User:
    description: "An employee or entity allowed access to the system"
    properties:
        email:
            type: "string"
        password:
            type: "string"
            format: "hash?"
        permisions:
            type: "object"
            description: "What permission levels the user has"
            format:
                clients:
                    read:
                        type: "boolean"
                    write:
                        type: "boolean"
                organizations:
                    read:
                        type: "boolean"
                    write:
                        type: "boolean"
```