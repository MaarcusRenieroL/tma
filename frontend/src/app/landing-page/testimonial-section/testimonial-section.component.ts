import { Component } from "@angular/core";

@Component({
  selector: "landing-page-testimonial-section",
  templateUrl: "./testimonial-section.component.html",
  styleUrl: "./testimonial-section.component.css",
})
export class TestimonialSectionComponent {
  testimonials = [
    {
      text: "SyncTeam has revolutionized how our global team works together. We're more productive and connected than ever.",
      author: "Sarah J., Project Manager",
    },
    {
      text: "The time zone management feature alone has saved us countless hours of confusion and missed deadlines.",
      author: "Alex T., Tech Lead",
    },
    {
      text: "SyncTeam has revolutionized how our global team works together. We're more productive and connected than ever.",
      author: "Sarah J., Project Manager",
    },
    {
      text: "The time zone management feature alone has saved us countless hours of confusion and missed deadlines.",
      author: "Alex T., Tech Lead",
    },
  ];

  responsiveOptions:
    | {
        breakpoint: string;
        numVisible: number;
        numScroll: number;
      }[]
    | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: "1400px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "1220px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "1100px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return "";
    }
  }
}
