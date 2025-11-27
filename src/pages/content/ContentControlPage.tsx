import React, { useMemo, useState } from "react";
import PageHeader from "../../components/shared/layout/PageHeader";
import Button from "../../components/shared/buttons/Button";
import ContentTabs, { type ContentTab } from "../../components/content/ContentTabs";
import ContentTable, {
  type ContentItem,
  type ContentKind,
  type Visibility,
  type MembershipTier,
} from "../../components/content/ContentTable";
import NewArticleModal, {
  type NewArticleValues,
} from "../../components/content/NewArticleModal";
import NewLessonModal, {
  type NewLessonValues,
} from "../../components/content/NewLessonModal";

const ContentManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentTab>("articles");

  const [items, setItems] = useState<ContentItem[]>([
    {
      id: "1",
      kind: "article",
      title: "The Art of Budgeting",
      typeLabel: "Article",
      category: "Financial Basics",
      visibility: "visible",
      tier: "free",
      lastUpdated: "2023-10-26",
    },
    {
      id: "2",
      kind: "article",
      title: "Understanding Your Credit Score",
      typeLabel: "Article",
      category: "Credit Health",
      visibility: "visible",
      tier: "paid",
      lastUpdated: "2023-10-25",
    },
    {
      id: "3",
      kind: "article",
      title: "Advanced Investment Strategies",
      typeLabel: "Article",
      category: "Investing",
      visibility: "hidden",
      tier: "vip",
      lastUpdated: "2023-10-24",
    },
    {
      id: "4",
      kind: "article",
      title: "How to Save for a Down Payment",
      typeLabel: "Article",
      category: "Home Buying",
      visibility: "visible",
      tier: "free",
      lastUpdated: "2023-10-23",
    },
    {
      id: "5",
      kind: "article",
      title: "Navigating Student Loans",
      typeLabel: "Article",
      category: "Debt Management",
      visibility: "visible",
      tier: "paid",
      lastUpdated: "2023-10-22",
    },
  ]);

  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const map: Record<ContentTab, ContentKind> = {
      articles: "article",
      lessons: "lesson",
      videos: "video",
      links: "link",
      static: "page",
    };
    const kind = map[activeTab];
    return items.filter((item) => item.kind === kind);
  }, [activeTab, items]);

  const addItem = (kind: ContentKind, values: {
    title: string;
    category: string;
    visibility: Visibility;
    tier: MembershipTier;
  }) => {
    const typeLabelMap: Record<ContentKind, string> = {
      article: "Article",
      lesson: "Lesson",
      video: "Video",
      link: "Resource Link",
      page: "Static Page",
    };

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    setItems((prev) => [
      {
        id: String(Date.now()),
        kind,
        typeLabel: typeLabelMap[kind],
        title: values.title,
        category: values.category,
        visibility: values.visibility,
        tier: values.tier,
        lastUpdated: today,
      },
      ...prev,
    ]);
  };

  const handleCreateArticle = (values: NewArticleValues) => {
    addItem("article", values);
    setArticleModalOpen(false);
    setActiveTab("articles");
  };

  const handleCreateLesson = (values: NewLessonValues) => {
    addItem("lesson", values);
    setLessonModalOpen(false);
    setActiveTab("lessons");
  };

  const handleEditRequest = (item: ContentItem) => {
    setEditingItem(item);
    setEditModalOpen(true);
  };

  const handleUpdate = (
    id: string,
    values: { title: string; category: string; visibility: Visibility; tier: MembershipTier }
  ) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, title: values.title, category: values.category, visibility: values.visibility, tier: values.tier, lastUpdated: new Date().toISOString().slice(0, 10) }
          : it
      )
    );
    setEditingItem(null);
    setEditModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this item? This action cannot be undone.");
    if (!confirmed) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
      setEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Management"
        description="Manage all educational and static content shown in the app."
        rightContent={
          <>
            <Button
              variant="secondary"
              onClick={() => setLessonModalOpen(true)}
            >
              New Lesson
            </Button>
            <Button onClick={() => setArticleModalOpen(true)}>
              New Article
            </Button>
          </>
        }
      />

      <ContentTabs value={activeTab} onChange={setActiveTab} />

      <ContentTable items={filteredItems} onEdit={handleEditRequest} onDelete={handleDelete} />

      <NewArticleModal
        open={articleModalOpen}
        onClose={() => setArticleModalOpen(false)}
        onCreate={handleCreateArticle}
      />

      <NewLessonModal
        open={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        onCreate={handleCreateLesson}
      />

      {/* Edit modal - reuse modals with initialValues/onUpdate */}
      {editingItem && editingItem.kind === "article" && (
        <NewArticleModal
          open={editModalOpen}
          onClose={() => {
            setEditingItem(null);
            setEditModalOpen(false);
          }}
          initialValues={{
            title: editingItem.title,
            category: editingItem.category,
            visibility: editingItem.visibility,
            tier: editingItem.tier,
          }}
          onCreate={() => {}}
          onUpdate={(values) => handleUpdate(editingItem.id, values)}
        />
      )}

      {editingItem && editingItem.kind === "lesson" && (
        <NewLessonModal
          open={editModalOpen}
          onClose={() => {
            setEditingItem(null);
            setEditModalOpen(false);
          }}
          initialValues={{
            title: editingItem.title,
            category: editingItem.category,
            visibility: editingItem.visibility,
            tier: editingItem.tier,
          }}
          onCreate={() => {}}
          onUpdate={(values) => handleUpdate(editingItem.id, values)}
        />
      )}
    </div>
  );
};

export default ContentManagementPage;
