import { Component } from '@angular/core';

@Component({
  selector: 'project-lead-team-department',
  templateUrl: './project-lead-team-department.component.html',
})
export class ProjectLeadTeamDepartmentComponent {
  departments = [
    { name: "Education", value: "education" },
    { name: "Finance", value: "finance" },
    { name: "Human Resources", value: "human_resources" },
    { name: "Engineering", value: "engineering" },
    { name: "Marketing", value: "marketing" },
    { name: "Sales", value: "sales" },
    { name: "Customer Support", value: "customer_support" },
    { name: "Operations", value: "operations" },
    { name: "IT and Infrastructure", value: "it_infrastructure" },
    { name: "Legal", value: "legal" },
    { name: "Research and Development", value: "research_and_development" },
    { name: "Product Management", value: "product_management" },
    { name: "Design", value: "design" },
    { name: "Quality Assurance", value: "quality_assurance" },
    { name: "Supply Chain", value: "supply_chain" },
  ];
}
