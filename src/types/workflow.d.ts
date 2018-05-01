interface IAction {
  // Actions can exist on multiple rules and in multiple workflows
  id: string;
  name: string;
  active: boolean;

  // Is the action intended to happen on a certain time
  // or immediately upon the parent rule criteria
  type: 'instant' | 'scheduled';

  // What does this operation do
  operation: {
    // What type is the operation and which part of the system handles it
    type: 'simple' | 'webhook' | 'custom';

    // Used for webhook endpoints and configuration
    payload: any;
  }
}

interface IRule {
  // Rules can exist in `n` workflows
  id: string;
  name: string;
  description: string;
  active: boolean;

  // When does this rule run
  trigger: 'create' | 'read' | 'update' | 'delete' | 'match';

  // What does this rule watch
  match: 'contact' | 'organization' | 'note' | 'rep';

  // What actions does this rule run
  actions: IAction[];
}

interface IWorkflow {
  id: string;
  name: string;
  active: boolean;
  rules: IRule[];
}
