const supabase = require('../config/supabase');

// 1. Get All Loans (dengan dukungan filter query status)
const getAllLoans = async (req, res) => {
    try {
        const { status } = req.query;
        let query = supabase.from('loans').select('*');

        if (status) {
            query = query.ilike('status', `%${status}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data peminjaman',
            data,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get Loan By ID
const getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('loans')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Create Loan
const createLoan = async (req, res) => {
    try {
        const { member_name, book_title, loan_date, return_date, status } = req.body;

        if (!member_name || !book_title) {
            return res.status(400).json({
                success: false,
                message: 'member_name dan book_title wajib diisi',
            });
        }

        const { data, error } = await supabase
            .from('loans')
            .insert([{ member_name, book_title, loan_date, return_date, status }])
            .select();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            message: 'Peminjaman berhasil dicatat',
            data: data[0],
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Update Loan
const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const { member_name, book_title, loan_date, return_date, status } = req.body;

        const { data, error } = await supabase
            .from('loans')
            .update({ member_name, book_title, loan_date, return_date, status })
            .eq('id', id)
            .select();

        if (error || data.length === 0) {
            return res.status(404).json({ success: false, message: 'Data tidak ditemukan atau gagal diperbarui' });
        }

        return res.status(200).json({
            success: true,
            message: 'Data peminjaman berhasil diperbarui',
            data: data[0],
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Delete Loan
const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('loans')
            .delete()
            .eq('id', id)
            .select();

        if (error || data.length === 0) {
            return res.status(404).json({ success: false, message: 'Data tidak ditemukan atau gagal dihapus' });
        }

        return res.status(200).json({
            success: true,
            message: 'Data peminjaman berhasil dihapus',
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
};