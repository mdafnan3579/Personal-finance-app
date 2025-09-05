import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
}

const mockExpenses: Expense[] = [
  { id: '1', title: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2024-01-15' },
  { id: '2', title: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2024-01-14' },
  { id: '3', title: 'Electricity Bill', amount: 120.00, category: 'Bills', date: '2024-01-13' },
  { id: '4', title: 'Coffee Shop', amount: 12.75, category: 'Food', date: '2024-01-12' },
  { id: '5', title: 'Movie Theater', amount: 25.00, category: 'Entertainment', date: '2024-01-11' },
]

const categories = ['Food', 'Transportation', 'Bills', 'Shopping', 'Entertainment', 'Other']

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })
  const { toast } = useToast()

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleAdd = () => {
    if (!formData.title || !formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }
   
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    }
    

    const updatedExpenses = [newExpense, ...expenses]
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

    setIsAddDialogOpen(false)
    toast({
      title: "Success",
      description: "Expense added successfully"
    })
  }
  

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    })
  }

  const handleUpdate = () => {
    if (!editingExpense || !formData.title || !formData.amount || !formData.category) return

    setExpenses(expenses.map(expense => 
      expense.id === editingExpense.id 
        ? { ...expense, ...formData, amount: parseFloat(formData.amount) }
        : expense
    ))
    setEditingExpense(null)
    resetForm()
    toast({
      title: "Success",
      description: "Expense updated successfully"
    })
  }

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
    toast({
      title: "Success",
      description: "Expense deleted successfully"
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: 'bg-blue-100 text-blue-800',
      Transportation: 'bg-green-100 text-green-800',
      Bills: 'bg-red-100 text-red-800',
      Shopping: 'bg-purple-100 text-purple-800',
      Entertainment: 'bg-yellow-100 text-yellow-800',
      Other: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors.Other
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">Manage your expenses and track your spending</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Enter the details of your new expense</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter expense title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <Button onClick={handleAdd} className="w-full">Add Expense</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>Your total spending this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground mt-2">{expenses.length} transactions</p>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(expense.category)}>
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(expense)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>Update the expense details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <Button onClick={handleUpdate} className="w-full">Update Expense</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Expenses