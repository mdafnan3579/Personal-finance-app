import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Calendar } from "lucide-react"

const Insights = () => {
  const insights = [
    {
      id: 1,
      type: 'positive',
      icon: CheckCircle,
      title: 'Great spending control!',
      description: 'You spent 15% less on entertainment this month compared to last month.',
      amount: '$85 saved',
      trend: 'down'
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Food expenses increased',
      description: 'Your food spending increased by 30% this month. Consider meal planning.',
      amount: '$120 over budget',
      trend: 'up'
    },
    {
      id: 3,
      type: 'neutral',
      icon: DollarSign,
      title: 'Transportation costs stable',
      description: 'Your transportation expenses remained consistent with last month.',
      amount: '$420 spent',
      trend: 'stable'
    },
    {
      id: 4,
      type: 'positive',
      icon: TrendingDown,
      title: 'Bills payment optimized',
      description: 'You saved $45 by switching to annual billing for your subscriptions.',
      amount: '$45 saved',
      trend: 'down'
    }
  ]

  const monthlyComparison = [
    { category: 'Food', thisMonth: 850, lastMonth: 720, change: 18 },
    { category: 'Transportation', thisMonth: 420, lastMonth: 415, change: 1.2 },
    { category: 'Bills', thisMonth: 1200, lastMonth: 1245, change: -3.6 },
    { category: 'Shopping', thisMonth: 680, lastMonth: 520, change: 30.8 },
    { category: 'Entertainment', thisMonth: 340, lastMonth: 400, change: -15 }
  ]

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-l-4 border-l-success bg-success/5'
      case 'warning':
        return 'border-l-4 border-l-warning bg-warning/5'
      default:
        return 'border-l-4 border-l-muted-foreground bg-muted/5'
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-destructive'
    if (change < 0) return 'text-success'
    return 'text-muted-foreground'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />
    if (change < 0) return <TrendingDown className="h-4 w-4" />
    return <Calendar className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Financial Insights</h2>
        <p className="text-muted-foreground">AI-powered analysis of your spending patterns</p>
      </div>

      {/* AI Insights Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
        <div className="grid gap-4">
          {insights.map((insight) => {
            const IconComponent = insight.icon
            return (
              <Card key={insight.id} className={getInsightStyle(insight.type)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                        <CardDescription className="mt-1">{insight.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {insight.amount}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Month-over-Month Comparison</h3>
        <Card>
          <CardHeader>
            <CardTitle>Category Spending Analysis</CardTitle>
            <CardDescription>Compare this month's spending with last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyComparison.map((item) => (
                <div key={item.category} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.category}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>This month: <span className="font-mono">${item.thisMonth}</span></span>
                      <span>Last month: <span className="font-mono">${item.lastMonth}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 ${getChangeColor(item.change)}`}>
                      {getChangeIcon(item.change)}
                      <span className="font-medium">
                        {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Patterns */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Spending Days</CardTitle>
            <CardDescription>Days when you spend the most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Fridays</span>
                <span className="font-mono">$156 avg</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Saturdays</span>
                <span className="font-mono">$134 avg</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sundays</span>
                <span className="font-mono">$89 avg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Status</CardTitle>
            <CardDescription>How you're tracking against your budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Monthly Budget</span>
                <span className="font-mono">$5,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Spent So Far</span>
                <span className="font-mono">$3,490</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Remaining</span>
                <span className="font-mono text-success">$1,510</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '69.8%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground text-center">69.8% of budget used</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Insights