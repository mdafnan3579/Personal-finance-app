import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import{Expenses} from './Expenses'


const expenseData = [
  { name: 'Food', value: 850, color: 'hsl(var(--chart-1))' },
  { name: 'Transportation', value: 420, color: 'hsl(var(--chart-2))' },
  { name: 'Bills', value: 1200, color: 'hsl(var(--chart-3))' },
  { name: 'Shopping', value: 680, color: 'hsl(var(--chart-4))' },
  { name: 'Entertainment', value: 340, color: 'hsl(var(--chart-5))' },
]

const weeklyData = [
  { week: 'Week 1', expenses: 750 },
  { week: 'Week 2', expenses: 920 },
  { week: 'Week 3', expenses: 680 },
  { week: 'Week 4', expenses: 1140 },
]




const Dashboard = () => {
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)
const totalBudget = 6000
const budgetRemaining = totalBudget - totalExpenses
const weeklyAverage = (totalExpenses / weeklyData.length).toFixed(0)
const budgetPercent = ((budgetRemaining / totalBudget) * 100).toFixed(0)
 const largestCategory = expenseData.reduce((prev, current) =>
    current.value > prev.value ? current : prev
  , { name: '', value: 0, color: '' })

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Afnan!</h2>
          <p className="text-muted-foreground">Here's your financial overview for this month.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Summary Cards */}
       <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success"> ${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
             
            </p>
          </CardContent>
        </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
             
            </p>
          </CardContent>
        </Card>
           
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${budgetRemaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((budgetRemaining / totalBudget) * 100).toFixed(0)}% of monthly budget
            </p>
              
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{largestCategory.name}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bills</div>
            <p className="text-xs text-muted-foreground">
               ${largestCategory.value.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${weeklyAverage}</div>
            <p className="text-xs text-muted-foreground">
              -5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Your spending breakdown for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Expenses</CardTitle>
            <CardDescription>Your weekly spending trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                <Bar dataKey="expenses" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard