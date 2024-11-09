import { 
  GitBranch, Shield, Cloud, Terminal, Activity, 
  Container, Network, Lock, Database, Server,
  Archive, Scale, Settings, Eye, MessageSquare
} from 'lucide-react';

export const toolCategories = [
  {
    title: "Cloud Platform",
    description: "Multi-region cloud infrastructure with automated scaling and hybrid deployment support.",
    icon: Cloud,
    items: ["AWS", "Azure", "GCP", "On-Premise", "Hybrid"]
  },
  {
    title: "GitOps & CD",
    description: "Automated delivery pipeline with declarative configs and instant rollback capabilities.",
    icon: GitBranch,
    items: [
      "FluxCD",
      "Helm",
      "Flagger",
      "Tekton",
      "Crossplane",
      "Weave GitOps"
    ]
  },
  {
    title: "Containers",
    description: "Production-grade container orchestration with auto-healing and advanced scheduling.",
    icon: Container,
    items: ["Kubernetes", "k3s", "Rancher", "Docker", "Cluster API", "Docker Compose"]
  },
  {
    title: "Security",
    description: "Zero-trust framework with encrypted secrets and automated policy enforcement.",
    icon: Shield,
    items: ["External Secrets", "Sealed Secrets", "SOPS", "KubeArmor", "Kyverno", "Authelia", "Falco", "Trivy"]
  },
  {
    title: "Databases",
    description: "High-availability databases with automated backups and instant failover support.",
    icon: Database,
    items: ["Percona PG", "MongoDB", "CloudNative PG", "MariaDB", "StackGres", "TimescaleDB", "PMM", "AWS RDS/AURORA"]
  },
  {
    title: "Caching",
    description: "Low-latency distributed caching with intelligent partitioning and replication.",
    icon: Activity,
    items: ["Redis", "ElastiCache", "Dragonfly", "Valkey", "InfluxDB", "Memcached", "AWS DynamoDB", "Aerospike"]
  },
  {
    title: "Messaging",
    description: "Fault-tolerant event streaming with guaranteed delivery and real-time processing.",
    icon: MessageSquare,
    items: ["AWS MSK", "Strimzi Kafka", "Debezium", "Kafka Connect", "Mirror Maker 2", "S3 Sink"]
  },
  {
    title: "Observability",
    description: "Full-stack monitoring with real-time metrics and intelligent alert management.",
    icon: Eye,
    items: ["Prometheus", "Grafana", "Datadog", "PMM", "ELK Stack", "KEDA"]
  },
  {
    title: "Networking",
    description: "Advanced service mesh with traffic management and blue-green deployment support.",
    icon: Network,
    items: ["Linkerd", "Kong", "Envoy Gateway", "Traefik", "Istio", "Cilium"]
  },
  {
    title: "Infrastructure",
    description: "Infrastructure as code with drift detection and automated state management.",
    icon: Settings,
    items: ["Terraform", "Crossplane", "AWS CDK", "Ansible", "Pulumi", "CloudFormation"]
  },
  {
    title: "Registries",
    description: "Secure artifact management with vulnerability scanning and access control.",
    icon: Archive,
    items: ["Nexus", "Artifactory", "Harbor", "ChartMuseum", "ACR", "ECR"]
  },
  {
    title: "Autoscaling",
    description: "Intelligent resource optimization with predictive scaling and cost management.",
    icon: Scale,
    items: ["Karpenter", "KEDA", "CASK AI", "AWS Autoscaler", "VPA", "HPA"]
  }
] as const;