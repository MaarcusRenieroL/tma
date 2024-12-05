package com.tma.organization_micro_service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Organization {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID organizationId;

  private String organizationName;

  private String email;

  private String website;

  private String phoneNumber;

  private String address;

  private String logoUrl;

  @ElementCollection private Set<UUID> userIds;

  @ElementCollection private Set<UUID> teamIds;

  @ElementCollection private Set<UUID> projectsIds;

  @ElementCollection private Set<UUID> tasksIds;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdDate;

  @UpdateTimestamp private LocalDateTime updatedDate;
}
