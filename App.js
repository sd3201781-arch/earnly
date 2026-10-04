import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const colors = {
  background: "#F6F8FC",
  card: "#FFFFFF",
  primary: "#635BFF",
  secondary: "#13B981",
  text: "#172033",
  muted: "#74809A",
  border: "#E5E9F2",
  warning: "#FFB020",
  dark: "#222B45",
};

const initialOpportunities = [
  {
    id: "1",
    type: "Freelance",
    title: "Design a social media banner",
    description: "Create a modern Instagram banner for a growing brand.",
    reward: 85,
    icon: "color-palette-outline",
    color: "#635BFF",
    level: "Beginner",
  },
  {
    id: "2",
    type: "Micro-task",
    title: "Review five mobile screens",
    description: "Give feedback about usability and visual design.",
    reward: 18,
    icon: "checkmark-done-outline",
    color: "#13B981",
    level: "Easy",
  },
  {
    id: "3",
    type: "Affiliate",
    title: "Share productivity tools",
    description: "Earn commissions by recommending useful digital tools.",
    reward: 45,
    icon: "link-outline",
    color: "#F59E0B",
    level: "Intermediate",
  },
];

const resources = [
  {
    id: "1",
    title: "How to start freelancing",
    category: "Beginner Guide",
    duration: "8 min read",
    icon: "school-outline",
  },
  {
    id: "2",
    title: "Create your first digital product",
    category: "Digital Products",
    duration: "12 min read",
    icon: "book-outline",
  },
  {
    id: "3",
    title: "Affiliate marketing basics",
    category: "Marketing",
    duration: "10 min read",
    icon: "trending-up-outline",
  },
];

function StatCard({ icon, title, value, color }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function OpportunityCard({ opportunity, onApply }) {
  return (
    <View style={styles.opportunityCard}>
      <View style={styles.opportunityHeader}>
        <View
          style={[
            styles.opportunityIcon,
            { backgroundColor: `${opportunity.color}18` },
          ]}
        >
          <Ionicons
            name={opportunity.icon}
            size={24}
            color={opportunity.color}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.opportunityType}>{opportunity.type}</Text>
            <Text style={styles.reward}>${opportunity.reward}</Text>
          </View>
          <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
        </View>
      </View>

      <Text style={styles.opportunityDescription}>
        {opportunity.description}
      </Text>

      <View style={styles.rowBetween}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{opportunity.level}</Text>
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => onApply(opportunity)}
        >
          <Text style={styles.applyButtonText}>View opportunity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BottomTab({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Ionicons
        name={icon}
        size={23}
        color={active ? colors.primary : colors.muted}
      />
      <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [earnings, setEarnings] = useState(245.5);
  const [completedTasks, setCompletedTasks] = useState(12);

  const filteredOpportunities = useMemo(() => {
    return initialOpportunities.filter((item) => {
      const query = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const applyToOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const completeOpportunity = () => {
    setEarnings((current) => current + selectedOpportunity.reward);
    setCompletedTasks((current) => current + 1);
    setSelectedOpportunity(null);

    Alert.alert(
      "Opportunity completed",
      `$${selectedOpportunity.reward} has been added to your pending balance.`
    );
  };

  const renderHome = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Alex 👋</Text>
          <Text style={styles.subtitle}>Build your digital income today.</Text>
        </View>

        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons
            name="notifications-outline"
            size={23}
            color={colors.text}
          />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.balanceLabel}>Available balance</Text>
            <Text style={styles.balanceAmount}>${earnings.toFixed(2)}</Text>
          </View>

          <View style={styles.walletIcon}>
            <Ionicons name="wallet-outline" size={25} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.balanceFooter}>
          <Text style={styles.pendingText}>$74.20 pending</Text>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={() =>
              Alert.alert(
                "Secure payout",
                "Connect Stripe or PayPal here to process withdrawals."
              )
            }
          >
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="trophy-outline"
          title="Level"
          value="Level 4"
          color={colors.warning}
        />
        <StatCard
          icon="flash-outline"
          title="Completed"
          value={completedTasks}
          color={colors.primary}
        />
        <StatCard
          icon="people-outline"
          title="Referrals"
          value="8"
          color={colors.secondary}
        />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Your progress</Text>
          <Text style={styles.sectionSubtitle}>
            $255 until you reach Level 5
          </Text>
        </View>

        <Text style={styles.progressPercent}>72%</Text>
      </View>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.streakCard}>
        <View style={styles.streakIcon}>
          <Ionicons name="flame" size={26} color="#F97316" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.streakTitle}>7-day earning streak</Text>
          <Text style={styles.streakDescription}>
            Complete one opportunity today to keep your streak alive.
          </Text>
        </View>
        <Text style={styles.streakNumber}>7</Text>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <Text style={styles.sectionSubtitle}>
            Opportunities matched to your skills
          </Text>
        </View>

        <TouchableOpacity onPress={() => setActiveTab("Explore")}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      {initialOpportunities.slice(0, 2).map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onApply={applyToOpportunity}
        />
      ))}
    </ScrollView>
  );

  const renderExplore = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>Explore opportunities</Text>
      <Text style={styles.pageSubtitle}>
        Find flexible ways to grow your income.
      </Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          placeholder="Search opportunities"
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.categoryRow}>
        {["All", "Freelance", "Digital Products", "Affiliate"].map(
          (category) => (
            <TouchableOpacity key={category} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {filteredOpportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onApply={applyToOpportunity}
        />
      ))}

      <View style={styles.transparencyCard}>
        <Ionicons
          name="shield-checkmark-outline"
          size={27}
          color={colors.secondary}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.transparencyTitle}>Transparent earnings</Text>
          <Text style={styles.transparencyText}>
            See fees, estimated completion time, reward history, and payout
            status before accepting work.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderLearn = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>Learn and grow</Text>
      <Text style={styles.pageSubtitle}>
        Practical resources for beginners and professionals.
      </Text>

      <View style={styles.learningBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.learningBannerTitle}>
            Build your first digital income stream
          </Text>
          <Text style={styles.learningBannerText}>
            Follow our four-step learning path and unlock higher-value work.
          </Text>
          <TouchableOpacity
            style={styles.learningButton}
            onPress={() => Alert.alert("Learning path", "Course started.")}
          >
            <Text style={styles.learningButtonText}>Start learning</Text>
          </TouchableOpacity>
        </View>

        <Ionicons name="rocket-outline" size={64} color="#FFFFFF" />
      </View>

      <Text style={styles.sectionTitle}>Popular resources</Text>

      {resources.map((resource) => (
        <TouchableOpacity
          key={resource.id}
          style={styles.resourceCard}
          onPress={() => Alert.alert(resource.title, "Resource opened.")}
        >
          <View style={styles.resourceIcon}>
            <Ionicons name={resource.icon} size={24} color={colors.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.resourceCategory}>{resource.category}</Text>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDuration}>{resource.duration}</Text>
          </View>

          <Ionicons name="chevron-forward" size={21} color={colors.muted} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.pageTitle}>Profile</Text>
      <Text style={styles.pageSubtitle}>
        Manage your identity, skills, and payout settings.
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.profileName}>Alex Morgan</Text>
        <Text style={styles.profileEmail}>alex@example.com</Text>
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={16} color={colors.secondary} />
          <Text style={styles.verifiedText}>Identity verified</Text>
        </View>
      </View>

      {[
        ["person-outline", "Personal information"],
        ["briefcase-outline", "Skills and experience"],
        ["card-outline", "Payment methods"],
        ["lock-closed-outline", "Security and privacy"],
        ["help-circle-outline", "Help center"],
      ].map(([icon, title]) => (
        <TouchableOpacity
          key={title}
          style={styles.profileRow}
          onPress={() => Alert.alert(title, "Settings opened.")}
        >
          <Ionicons name={icon} size={22} color={colors.primary} />
          <Text style={styles.profileRowText}>{title}</Text>
          <Ionicons name="chevron-forward" size={19} color={colors.muted} />
        </TouchableOpacity>
      ))}

      <View style={styles.securityNote}>
        <Ionicons name="shield-checkmark" size={22} color={colors.secondary} />
        <Text style={styles.securityNoteText}>
          Your payment and personal information are encrypted and protected.
        </Text>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    if (activeTab === "Explore") return renderExplore();
    if (activeTab === "Learn") return renderLearn();
    if (activeTab === "Profile") return renderProfile();
    return renderHome();
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}

      <View style={styles.bottomTabBar}>
        <BottomTab
          icon="home-outline"
          label="Home"
          active={activeTab === "Home"}
          onPress={() => setActiveTab("Home")}
        />
        <BottomTab
          icon="compass-outline"
          label="Explore"
          active={activeTab === "Explore"}
          onPress={() => setActiveTab("Explore")}
        />
        <BottomTab
          icon="school-outline"
          label="Learn"
          active={activeTab === "Learn"}
          onPress={() => setActiveTab("Learn")}
        />
        <BottomTab
          icon="person-outline"
          label="Profile"
          active={activeTab === "Profile"}
          onPress={() => setActiveTab("Profile")}
        />
      </View>

      <Modal
        visible={!!selectedOpportunity}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOpportunity(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedOpportunity(null)}
            >
              <Ionicons name="close" size={23} color={colors.text} />
            </TouchableOpacity>

            {selectedOpportunity && (
              <>
                <View
                  style={[
                    styles.modalIcon,
                    {
                      backgroundColor: `${selectedOpportunity.color}18`,
                    },
                  ]}
                >
                  <Ionicons
                    name={selectedOpportunity.icon}
                    size={30}
                    color={selectedOpportunity.color}
                  />
                </View>

                <Text style={styles.modalType}>
                  {selectedOpportunity.type}
                </Text>
                <Text style={styles.modalTitle}>
                  {selectedOpportunity.title}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedOpportunity.description}
                </Text>

                <View style={styles.earningsBreakdown}>
                  <View>
                    <Text style={styles.breakdownLabel}>Gross reward</Text>
                    <Text style={styles.breakdownValue}>
                      ${selectedOpportunity.reward}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.breakdownLabel}>Platform fee</Text>
                    <Text style={styles.breakdownValue}>$0.00</Text>
                  </View>
                  <View>
                    <Text style={styles.breakdownLabel}>You receive</Text>
                    <Text
                      style={[styles.breakdownValue, { color: colors.secondary }]}
                    >
                      ${selectedOpportunity.reward}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={completeOpportunity}
                >
                  <Text style={styles.completeButtonText}>
                    Accept opportunity
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  greeting: {
    fontSize: 23,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: 5,
    color: colors.muted,
    fontSize: 14,
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#F04438",
  },
  balanceCard: {
    backgroundColor: colors.primary,
    padding: 22,
    borderRadius: 22,
    marginBottom: 16,
  },
  balanceLabel: {
    color: "#DCD9FF",
    fontSize: 13,
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF25",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  pendingText: {
    color: "#E7E5FF",
    fontSize: 13,
  },
  withdrawButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  withdrawText: {
    color: colors.primary,
    fontWeight: "700",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 13,
    backgroundColor: colors.card,
    borderRadius: 16,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  statTitle: {
    fontSize: 11,
    color: colors.muted,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 3,
    color: colors.text,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.muted,
  },
  progressPercent: {
    color: colors.primary,
    fontWeight: "800",
  },
  progressBackground: {
    height: 10,
    backgroundColor: "#E4E6F4",
    borderRadius: 10,
    marginBottom: 20,
  },
  progressFill: {
    width: "72%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 17,
    padding: 14,
    marginBottom: 27,
  },
  streakIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  streakTitle: {
    fontWeight: "800",
    color: colors.text,
  },
  streakDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
    marginTop: 4,
  },
  streakNumber: {
    fontSize: 26,
    fontWeight: "900",
    color: "#F97316",
  },
  viewAll: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  opportunityCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  opportunityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  opportunityIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  opportunityType: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  opportunityTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
    marginTop: 4,
  },
  reward: {
    color: colors.secondary,
    fontWeight: "900",
    fontSize: 16,
  },
  opportunityDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginVertical: 14,
  },
  levelBadge: {
    backgroundColor: "#F1F3F8",
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  levelText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
    marginTop: 12,
  },
  pageSubtitle: {
    color: colors.muted,
    marginTop: 5,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: colors.text,
  },
  categoryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  categoryButton: {
    backgroundColor: "#EEEFFF",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 9,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
  },
  transparencyCard: {
    flexDirection: "row",
    gap: 13,
    backgroundColor: "#EDFCF6",
    padding: 16,
    borderRadius: 16,
    marginTop: 5,
  },
  transparencyTitle: {
    color: colors.text,
    fontWeight: "800",
    marginBottom: 4,
  },
  transparencyText: {
    color: colors.muted,
    lineHeight: 18,
    fontSize: 12,
  },
  learningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark,
    borderRadius: 20,
    padding: 19,
    marginBottom: 25,
  },
  learningBannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 7,
  },
  learningBannerText: {
    color: "#C8D0E0",
    lineHeight: 18,
    fontSize: 12,
    marginBottom: 15,
  },
  learningButton: {
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  learningButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    gap: 12,
  },
  resourceIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EEEFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  resourceCategory: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
  },
  resourceTitle: {
    color: colors.text,
    fontWeight: "800",
    marginTop: 3,
  },
  resourceDuration: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 19,
    padding: 22,
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#DCD9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 31,
    color: colors.primary,
    fontWeight: "900",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    marginTop: 10,
  },
  profileEmail: {
    color: colors.muted,
    marginTop: 4,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  verifiedText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "700",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
  },
  profileRowText: {
    flex: 1,
    color: colors.text,
    fontWeight: "700",
  },
  securityNote: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 16,
    padding: 14,
    backgroundColor: "#EDFCF6",
    borderRadius: 14,
  },
  securityNoteText: {
    flex: 1,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  bottomTabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabButton: {
    alignItems: "center",
    minWidth: 65,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "700",
    marginTop: 3,
  },
  activeTabLabel: {
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 24,
    paddingBottom: 34,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 4,
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  modalType: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  modalTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 23,
    marginTop: 6,
  },
  modalDescription: {
    color: colors.muted,
    lineHeight: 20,
    marginTop: 10,
  },
  earningsBreakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingVertical: 17,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  breakdownLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  breakdownValue: {
    color: colors.text,
    fontWeight: "900",
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 22,
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
  },
});
