import React from "react";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const ProductPageLayout = ({ title, description, children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 p-2 rounded-full ${category.color} text-white`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-white/90 text-slate-700 hover:bg-white">
                    {category.quizCount} quizzes
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    asChild
                    className="w-full group-hover:bg-slate-900 transition-colors"
                  >
                    <Link href={`/quiz/${category.id}`}>Start Quiz</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })} */}
          {children}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {categories.reduce((total, cat) => total + cat.quizCount, 0)}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Total Quizzes</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{categories.length}</div>
              <div className="text-slate-600 dark:text-slate-400">Categories</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">10K+</div>
              <div className="text-slate-600 dark:text-slate-400">Questions</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductPageLayout;
